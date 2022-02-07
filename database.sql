CREATE TABLE todo(
    id UUID,
    name VARCHAR(255),
    done BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP
);
