#!/bin/bash

script_directory=$(dirname "$(readlink -f "$0")")

component_name="$1"

component_parent="$2"

project_root=$PWD
components_folder="$project_root/src/components"
react_file="$component_name.tsx"
css_file="$component_name.module.css"

css_from_components="../styles/globals.css"

# Création du dossier du composant
if [ -z "$component_parent" ]; then
        component_dir="$components_folder/$component_name"
    else
        component_dir="$components_folder/$component_parent/$component_name"
fi

path=$(realpath --relative-to="$project_root/src" "$component_dir")
depth=$(grep -o "/" <<< "$path" | wc -l)
global_css_import_string=""

for ((i=0; i<depth; i++)); do
    global_css_import_string+="../"
done

global_css_import_string+="$css_from_components"


# Création du dossier du composant 
mkdir -p "$component_dir"
# Création des fichiers
touch "$component_dir/$react_file"
touch "$component_dir/$css_file"

# Ajout du code dans le fichier .tsx
echo "import styles from './$css_file'

const $component_name = () => {
  return (
    <p> Component $component_name works </p>
  )
}


export default $component_name
" > "$component_dir/$react_file"



# Ajout du code dans le fichier .css
echo "@import url('$global_css_import_string')
" > "$component_dir/$css_file"



echo "Composant $component_name créé avec succès dans : $component_dir"
