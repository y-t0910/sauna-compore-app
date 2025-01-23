package database

import (
	"context"
	"errors"
	"time"
)

type Favorite struct {
	ID        int64     `db:"id"`
	UserID    int64     `db:"user_id"`
	SaunaID   int64     `db:"sauna_id"`
	CreatedAt time.Time `db:"created_at"`
}

type FavoriteRepository struct {
	db Database
}

func NewFavoriteRepository(db Database) *FavoriteRepository {
	return &FavoriteRepository{db: db}
}

func (r *FavoriteRepository) Create(ctx context.Context, userID, saunaID int64) error {
	query := `
		INSERT INTO favorites (user_id, sauna_id, created_at)
		VALUES ($1, $2, $3)
	`
	_, err := r.db.ExecContext(ctx, query, userID, saunaID, time.Now())
	return err
}

func (r *FavoriteRepository) Delete(ctx context.Context, userID, saunaID int64) error {
	query := `
		DELETE FROM favorites
		WHERE user_id = $1 AND sauna_id = $2
	`
	result, err := r.db.ExecContext(ctx, query, userID, saunaID)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return errors.New("favorite not found")
	}
	return nil
}

func (r *FavoriteRepository) List(ctx context.Context, userID int64) ([]Favorite, error) {
	query := `
		SELECT id, user_id, sauna_id, created_at
		FROM favorites
		WHERE user_id = $1
		ORDER BY created_at DESC
	`
	var favorites []Favorite
	if err := r.db.SelectContext(ctx, &favorites, query, userID); err != nil {
		return nil, err.(error)
	}
	return favorites, nil
}

func (r *FavoriteRepository) Exists(ctx context.Context, userID, saunaID int64) (bool, error) {
	query := `
		SELECT EXISTS (
			SELECT 1 FROM favorites
			WHERE user_id = $1 AND sauna_id = $2
		)
	`
	var exists bool
	err := r.db.QueryRowContext(ctx, query, userID, saunaID).Scan(&exists)
	return exists, err
}
