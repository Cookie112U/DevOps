import psycopg2
from psycopg2 import sql

def create_database():
    try:
        conn = psycopg2.connect(
            dbname="postgres", 
            user="your_user", 
            password="your_password", 
            host="localhost", 
            port="5432"
        )
        cur = conn.cursor()

        cur.execute("CREATE DATABASE pathfinder_db;")
        print("Database 'pathfinder_db' created successfully.")
        cur.close()
        conn.commit()

    except Exception as e:
        print(f"Error creating database: {e}")
    finally:
        if conn:
            conn.close()

def create_tables():
    try:
        conn = psycopg2.connect(
            dbname="pathfinder_db", 
            user="your_user", 
            password="your_password", 
            host="localhost", 
            port="5432"
        )
        cur = conn.cursor()

        cur.execute("""
            CREATE TABLE IF NOT EXISTS maps (
                map_id SERIAL PRIMARY KEY,
                width INT NOT NULL,
                height INT NOT NULL,
                map_data TEXT NOT NULL
            );
        """)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS heroes (
                hero_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                race VARCHAR(255) NOT NULL,
                special_abilities TEXT
            );
        """)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS hero_positions (
                position_id SERIAL PRIMARY KEY,
                hero_id INT REFERENCES heroes(hero_id) ON DELETE CASCADE,
                map_id INT REFERENCES maps(map_id) ON DELETE CASCADE,
                x_pos INT NOT NULL,
                y_pos INT NOT NULL
            );
        """)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS routes (
                route_id SERIAL PRIMARY KEY,
                map_id INT REFERENCES maps(map_id) ON DELETE CASCADE,
                route_data TEXT NOT NULL,
                route_time FLOAT NOT NULL
            );
        """)

        conn.commit()
        print("Tables created successfully.")
        
        cur.close()
    except Exception as e:
        print(f"Error creating tables: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    create_database()
    create_tables()
