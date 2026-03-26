SELECT jsonb_pretty(
    jsonb_agg(
        jsonb_build_object(
            'parent_id', parent.id,
            'parent_name', parent.name,
            'subcategories', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', child.id,
                        'name', child.name
                    )
                )
                FROM categories child
                WHERE child.category_id = parent.id
            )
        )
    )
) AS categories_tree
FROM categories parent
WHERE parent.category_id IS NULL;


SELECT 
    p.id, 
    p.title, 
    p.price, 
    c.name AS category_name
FROM products p
JOIN categories c ON p.category_id = c.id
ORDER BY c.name;
