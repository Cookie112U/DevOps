import psycopg2
from config import DB_CONFIG

def get_connection():
    """Функция для подключения к базе данных."""
    return psycopg2.connect(**DB_CONFIG)

def get_maps():
    """Функция для получения всех карт из базы данных."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM maps;")
    maps = cur.fetchall()
    cur.close()
    conn.close()
    return maps

def insert_map(width, height, map_data):
    """Функция для добавления карты в базу данных."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO maps (width, height, map_data) 
        VALUES (%s, %s, %s) RETURNING map_id;
    """, (width, height, map_data))
    map_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return map_id
