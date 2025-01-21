package database

import (
	"context"
	"database/sql"
)

type FacilityRepository struct {
	db *sql.DB
}

type Facility struct {
	ID          int64
	Name        string
	Address     string
	Description string
	CreatedAt   string
	UpdatedAt   string
}

func NewFacilityRepository(db *sql.DB) *FacilityRepository {
	return &FacilityRepository{db: db}
}

func (r *FacilityRepository) GetAll(ctx context.Context) ([]Facility, error) {
	rows, err := r.db.QueryContext(ctx, "SELECT id, name, address, description, created_at, updated_at FROM facilities")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var facilities []Facility
	for rows.Next() {
		var f Facility
		if err := rows.Scan(&f.ID, &f.Name, &f.Address, &f.Description, &f.CreatedAt, &f.UpdatedAt); err != nil {
			return nil, err
		}
		facilities = append(facilities, f)
	}
	return facilities, nil
}

func (r *FacilityRepository) GetByID(ctx context.Context, id int64) (*Facility, error) {
	var f Facility
	err := r.db.QueryRowContext(ctx, "SELECT id, name, address, description, created_at, updated_at FROM facilities WHERE id = ?", id).
		Scan(&f.ID, &f.Name, &f.Address, &f.Description, &f.CreatedAt, &f.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &f, nil
}

func (r *FacilityRepository) Create(ctx context.Context, f *Facility) error {
	result, err := r.db.ExecContext(ctx,
		"INSERT INTO facilities (name, address, description) VALUES (?, ?, ?)",
		f.Name, f.Address, f.Description)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	f.ID = id
	return nil
}

func (r *FacilityRepository) Update(ctx context.Context, f *Facility) error {
	_, err := r.db.ExecContext(ctx,
		"UPDATE facilities SET name = ?, address = ?, description = ? WHERE id = ?",
		f.Name, f.Address, f.Description, f.ID)
	return err
}

func (r *FacilityRepository) Delete(ctx context.Context, id int64) error {
	_, err := r.db.ExecContext(ctx, "DELETE FROM facilities WHERE id = ?", id)
	return err
}
