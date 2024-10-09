import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()


class Postgre:
    cont_address_query = '''
        SELECT
            COUNT(cle_interop_adr)
        FROM bdd.adresse a;
    '''

    select_address_query = '''
        SELECT
            cle_interop_adr,
            libelle_adresse,
            st_x(ST_Transform(geom_adresse, 4326)),
            st_y(ST_Transform(geom_adresse, 4326))
        FROM bdd.adresse a
        OFFSET '{skip}'
        LIMIT '{count}';
    '''

    def __init__(self):
        self.client = psycopg2.connect(
            user=os.getenv('USER'),
            password=os.getenv('PASSWORD'),
            host=os.getenv('HOST'),
            port=os.getenv('SQL_PORT'),
            database=os.getenv('DATABASE_NAME'),
            options=f"-c search_path={os.getenv('SQL_SCHEMA')},public"
        )

        self.postgre = self.client.cursor()

    def countAddress(self):
        self.postgre.execute(self.cont_address_query)

        return self.postgre.fetchone()[0]

    def getAddress(self, skip, count):
        self.postgre.execute(self.select_address_query.format(skip=skip, count=count))

        return self.postgre.fetchall()

    def destroy(self):
        self.postgre.close()
        self.client.close()
