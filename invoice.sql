CREATE TABLE invoice (
    invoice_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    invoice_date DATETIME NOT NULL,
    billing_address VARCHAR(70) NOT NULL,
    billing_city VARCHAR(40) NOT NULL,
    billing_state VARCHAR(40),
    billing_country VARCHAR(40) NOT NULL,
    billing_postal_code VARCHAR(10) NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);
