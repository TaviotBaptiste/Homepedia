import urllib3
import requests
from bs4 import BeautifulSoup
import mysql.connector
from mysql.connector import Error
import pandas as pd
import psycopg2
from unidecode import unidecode


def create_server_connection():
    connection = None
    db_name = 'homepediadb'
    db_username = 'epitech'
    db_password = 'cifxec-capcux-3rahvU'
    db_host = '75.119.129.138'
    db_port = 5432
    try:
        connection = psycopg2.connect(database=db_name,
                        user=db_username,
                        password=db_password,
                        host=db_host,
                        port=db_port)
        print("PostgreSql Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")
    return connection


def scrape_url(url):


        # Exemple de récupération de données
        # data = soup.find('div', {'class': 'your_target_class'}).text.strip()

    try:
        response = requests.get(url, verify=False)
        response.raise_for_status()  # Vérifie si la requête a réussi
        soup = BeautifulSoup(response.text, 'html.parser')
        table_infos = soup.find('table', class_='bloc_chiffre')
        nb_habitant = age_moyen = pop_active = None
        if table_infos:
            for row in table_infos.find_all('tr'):
                cells = row.find_all('td')
                if cells:
                    label = cells[0].text.strip()
                    value = cells[1].text.strip()
                    if label == "Nombre d'habitants":
                        nb_habitant = value
                    elif label == "Age moyen":
                        age_moyen = value
                    elif label == "Pop active":
                        pop_active = value
        else:
            print("Erreur lors de la requête HTTP")
        return {
            'nb_habitant':nb_habitant,
            'age_moyen':age_moyen,
            'pop_active':pop_active
        }
    except requests.RequestException as e:
        print(f"Erreur lors de la requête vers {url}: {e}")
        return None
    except AttributeError:
        print(f"Données non trouvées sur la page {url}")
        return None
    except requests.exceptions.HTTPError as e:
        print(f"Erreur HTTP lors de la requête vers {url}: {e}")
        return None

# Parcours de la base de données et scrapping des URLs
conn = create_server_connection()
cursor = conn.cursor()
cursor.execute("SELECT com, nccenr FROM bdd.v_commune_2023")
rows = cursor.fetchall()
count = 0
for com, nccenr in rows:
    nccenr_normalized = unidecode(nccenr).lower().replace(' ', '-')
    url = f"https://www.bien-dans-ma-ville.fr/{nccenr_normalized}-{com}/"
    print(url)
    data = scrape_url(url)
    if data:
        try:
            # Insertion des données dans la base de données
            cursor.execute("""
                UPDATE bdd.v_commune_2023 
                SET nb_habitant = %s, age_moyen = %s, pop_active = %s
                WHERE com = %s AND nccenr = %s
                """, (data['nb_habitant'], data['age_moyen'], data['pop_active'], com, nccenr))
            conn.commit()  # Validation de la transaction
            print(f"Données insérées pour com={com}, nccenr={nccenr}")
            print(count)
            count += 1

        except psycopg2.Error as e:
            print(f"Erreur lors de l'insertion des données dans PostgreSQL: {e}")
    else:
        print(f"Aucune donnée récupérée pour com={com}, nccenr={nccenr}")

cursor.close()
conn.close()




