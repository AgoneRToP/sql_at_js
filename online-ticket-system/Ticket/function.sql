CREATE OR REPLACE FUNCTION get_age_from_birthdate(birthdate DATE)
    RETURNS NUMERIC
    LANGUAGE plpgsql
AS
$$
DECLARE
    v_age INT;
BEGIN
    IF birthdate > CURRENT_DATE THEN
        RAISE EXCEPTION 'Дата рождения % не может быть в будущем!', birthdate;
    END IF;

    SELECT EXTRACT(YEAR FROM AGE(NOW(), birthdate)) INTO v_age;

    IF v_age IS NULL THEN
        RAISE EXCEPTION 'Неправильно ведено число!';
    END IF;

    RETURN v_age;  
END;
$$;



SELECT get_age_from_birthdate('1999-05-15');
