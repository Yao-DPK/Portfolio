import { Injectable, BadRequestException } from '@nestjs/common';
import { and, gte, lte, eq } from 'drizzle-orm';
import { db } from 'src/database/db';
import { VisitorStatsDto } from './visitor.dto';
import { dailyVisits, totalVisitors } from 'src/database/schema';

@Injectable()
export class VisitorService {
  constructor() {}

  // Récupérer les statistiques
  async getStats(): Promise<VisitorStatsDto> {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const yearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Total cumulé
    const [totalRow] = await db.select().from(totalVisitors).where(eq(totalVisitors.id, 1));
    const total = totalRow?.totalCount || 0;

    // Aujourd'hui
    const [todayRow] = await db.select().from(dailyVisits).where(eq(dailyVisits.visitDate, today));
    const todayCount = todayRow?.visitorCount || 0;

    // 7 jours
    const weekRows = await db
      .select()
      .from(dailyVisits)
      .where(
        and(
          gte(dailyVisits.visitDate, weekAgo),
          lte(dailyVisits.visitDate, today)
        )
      );
    const weekCount = weekRows.reduce((acc, row) => acc + row.visitorCount, 0);

    // 30 jours
    const monthRows = await db
      .select()
      .from(dailyVisits)
      .where(
        and(
          gte(dailyVisits.visitDate, monthAgo),
          lte(dailyVisits.visitDate, today)
        )
      );
    const monthCount = monthRows.reduce((acc, row) => acc + row.visitorCount, 0);

    // 365 jours
    const yearRows = await db
      .select()
      .from(dailyVisits)
      .where(
        and(
          gte(dailyVisits.visitDate, yearAgo),
          lte(dailyVisits.visitDate, today)
        )
      );
    const yearCount = yearRows.reduce((acc, row) => acc + row.visitorCount, 0);

    return {
      today: todayCount,
      week: weekCount,
      month: monthCount,
      year: yearCount,
      total,
    };
  }

  // Enregistrer une nouvelle visite (avec gestion du cookie)
  async recordVisit(visitorId: string | undefined): Promise<{ alreadyCounted: boolean }> {
    const today = new Date().toISOString().split('T')[0];

    // Si un visitorId est fourni, on considère qu'il a déjà été compté aujourd'hui
    if (visitorId) {
      // On pourrait vérifier si le cookie existe, mais pour simplifier, on renvoie alreadyCounted
      return { alreadyCounted: true };
    }

    // Incrémenter le compteur du jour
    const [existing] = await db
      .select()
      .from(dailyVisits)
      .where(eq(dailyVisits.visitDate, today));

    if (existing) {
      await db
        .update(dailyVisits)
        .set({ visitorCount: existing.visitorCount + 1 })
        .where(eq(dailyVisits.visitDate, today));
    } else {
      await db.insert(dailyVisits).values({ visitDate: today, visitorCount: 1 });
    }

    // Incrémenter le total cumulé
    const [totalRow] = await db.select().from(totalVisitors).where(eq(totalVisitors.id, 1));
    if (totalRow) {
      await db
        .update(totalVisitors)
        .set({ totalCount: totalRow.totalCount + 1 })
        .where(eq(totalVisitors.id, 1));
    } else {
      await db.insert(totalVisitors).values({ totalCount: 1 });
    }

    return { alreadyCounted: false };
  }
}