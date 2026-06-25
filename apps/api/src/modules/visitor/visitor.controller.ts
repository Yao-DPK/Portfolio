import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { VisitorService } from './visitor.service';
import { VisitorStatsDto } from './visitor.dto';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Get()
  async getStats(): Promise<VisitorStatsDto> {
    return this.visitorService.getStats();
  }

  @Post()
  async recordVisit(@Req() req: Request, @Res() res: Response) {
    // Lire le cookie 'visitor_id'
    const visitorId = req.cookies?.visitor_id;

    const result = await this.visitorService.recordVisit(visitorId);

    // Si le visiteur n'a pas encore été compté aujourd'hui, on définit un cookie
    if (!result.alreadyCounted) {
      const newVisitorId = crypto.randomUUID();
      res.cookie('visitor_id', newVisitorId, {
        maxAge: 24 * 60 * 60 * 1000, // 24h
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    // On renvoie les stats mises à jour
    const stats = await this.visitorService.getStats();
    res.json(stats);
  }
}