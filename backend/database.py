import pymysql
class Database:
    def __init__(self):
        self.host = "localhost"
        self.user = "root"
        self.password = "root"
        self.db = "registro_scolastico"
    def get_connection(self):
        return pymysql.connect(host=self.host, user=self.user, password=self.password, db=self.db, cursorclass=pymysql.cursors.DictCursor)
    def aggiungi_voto(self, nome, materia, voto, username):
        conn = self.get_connection()
        try:
            with conn.cursor() as cursor:
                sql = "INSERT INTO voti (nome_studente, materia, voto, username_studente) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (nome, materia, voto, username))
            conn.commit()
        finally:
            conn.close()
    def get_tutti_voti(self):
        conn = self.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM voti")
                return cursor.fetchall()
        finally:
            conn.close()
    def get_voti_studente(self, username):
        conn = self.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM voti WHERE username_studente = %s", (username,))
                return cursor.fetchall()
        finally:
            conn.close()
