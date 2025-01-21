package database

import (
	"context"
	"database/sql"
)

type Review struct {
	ID        int64
	SaunaID   int64
	UserID    int64
	Rating    float64
	Comment   string
	CreatedAt string
	UpdatedAt string
}

type ReviewRepository struct {
	db *sql.DB
}

func NewReviewRepository(db *sql.DB) *ReviewRepository {
	return &ReviewRepository{db: db}
}

// Create adds a new review to the database
func (r *ReviewRepository) Create(ctx context.Context, review *Review) error {
	query := `
		INSERT INTO reviews (sauna_id, user_id, rating, comment, created_at, updated_at)
		VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
		RETURNING id, created_at, updated_at`

	return r.db.QueryRowContext(
		ctx,
		query,
		review.SaunaID,
		review.UserID,
		review.Rating,
		review.Comment,
	).Scan(&review.ID, &review.CreatedAt, &review.UpdatedAt)
}

// GetByID retrieves a review by its ID
func (r *ReviewRepository) GetByID(ctx context.Context, id int64) (*Review, error) {
	review := &Review{}
	query := `SELECT id, sauna_id, user_id, rating, comment, created_at, updated_at FROM reviews WHERE id = $1`

	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&review.ID,
		&review.SaunaID,
		&review.UserID,
		&review.Rating,
		&review.Comment,
		&review.CreatedAt,
		&review.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return review, nil
}

// GetBySaunaID retrieves all reviews for a specific sauna
func (r *ReviewRepository) GetBySaunaID(ctx context.Context, saunaID int64) ([]*Review, error) {
	query := `SELECT id, sauna_id, user_id, rating, comment, created_at, updated_at FROM reviews WHERE sauna_id = $1`

	rows, err := r.db.QueryContext(ctx, query, saunaID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reviews []*Review
	for rows.Next() {
		review := &Review{}
		err := rows.Scan(
			&review.ID,
			&review.SaunaID,
			&review.UserID,
			&review.Rating,
			&review.Comment,
			&review.CreatedAt,
			&review.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		reviews = append(reviews, review)
	}
	return reviews, nil
}

// Update modifies an existing review
func (r *ReviewRepository) Update(ctx context.Context, review *Review) error {
	query := `
		UPDATE reviews 
		SET rating = $1, comment = $2, updated_at = CURRENT_TIMESTAMP
		WHERE id = $3
		RETURNING updated_at`

	return r.db.QueryRowContext(
		ctx,
		query,
		review.Rating,
		review.Comment,
		review.ID,
	).Scan(&review.UpdatedAt)
}

// Delete removes a review from the database
func (r *ReviewRepository) Delete(ctx context.Context, id int64) error {
	query := `DELETE FROM reviews WHERE id = $1`
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
