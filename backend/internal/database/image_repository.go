package database

import (
	"context"
	"database/sql"
)

type ImageRepository struct {
	db *sql.DB
}

type Image struct {
	ID          int64  `json:"id"`
	SaunaID     int64  `json:"sauna_id"`
	ImageURL    string `json:"image_url"`
	Description string `json:"description"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}

func NewImageRepository(db *sql.DB) *ImageRepository {
	return &ImageRepository{db: db}
}

func (r *ImageRepository) Create(ctx context.Context, image *Image) error {
	query := `
		INSERT INTO images (sauna_id, image_url, description)
		VALUES ($1, $2, $3)
		RETURNING id, created_at, updated_at`

	return r.db.QueryRowContext(
		ctx, query,
		image.SaunaID,
		image.ImageURL,
		image.Description,
	).Scan(&image.ID, &image.CreatedAt, &image.UpdatedAt)
}

func (r *ImageRepository) GetBySaunaID(ctx context.Context, saunaID int64) ([]Image, error) {
	query := `
		SELECT id, sauna_id, image_url, description, created_at, updated_at
		FROM images
		WHERE sauna_id = $1
		ORDER BY created_at DESC`

	rows, err := r.db.QueryContext(ctx, query, saunaID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var images []Image
	for rows.Next() {
		var img Image
		if err := rows.Scan(
			&img.ID,
			&img.SaunaID,
			&img.ImageURL,
			&img.Description,
			&img.CreatedAt,
			&img.UpdatedAt,
		); err != nil {
			return nil, err
		}
		images = append(images, img)
	}

	return images, nil
}

func (r *ImageRepository) Delete(ctx context.Context, id int64) error {
	query := `DELETE FROM images WHERE id = $1`
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
