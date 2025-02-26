import React from 'react';

export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface Sauna {
  id: number;
  name: string;
  location: string;
}

export interface LogoutResponse {
  message: string;
}
export interface DeleteAccountRequest {
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export interface DeleteAccountResponse {
  success: boolean;
  user?: User;
  message: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export interface SaunaSearchParams {
  location?: string;
  minTemp?: number;
  maxTemp?: number;
  hasRestArea?: boolean;
  keyword?: string;
}

export interface SaunaSearchResponse {
  success: boolean;
  data: Sauna[];
  total: number;
}

export interface Review {
  id: number;
  saunaId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewRequest {
  saunaId: number;
  rating: number;
  comment: string;
}

export interface ReviewResponse {
  success: boolean;
  data?: Review;
  error?: string;
}

export interface SaunaFacility {
  id: number;
  saunaId: number;
  temperatureRoom: number;
  waterBath: number;
  restArea: boolean;
  facilities: string[];
  amenities: string[];
  businessHours: string;
  price: number;
  description: string;
}

export interface UpdateFacilityRequest {
  temperatureRoom?: number;
  waterBath?: number;
  restArea?: boolean;
  facilities?: string[];
  amenities?: string[];
  businessHours?: string;
  price?: number;
  description?: string;
}

export interface Bookmark {
  id: number;
  userId: number;
  saunaId: number;
  note?: string;
  createdAt: string;
}

export interface ShareBookmarkRequest {
  saunaId: number;
  targetUserId: number;
  message?: string;
}

export interface BookmarkResponse {
  success: boolean;
  data?: Bookmark;
  message?: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}


export interface FacilityDisplayProps {
  facility: SaunaFacility;
}

const FacilityDisplay = ({ facility }: FacilityDisplayProps) => {
 
  return null;
};


export interface BookmarkButtonProps {
  isBookmarked: boolean;
  onBookmark: () => Promise<void>;
  onShare: (targetUserId: number, message: string) => Promise<void>;
}

export interface BookmarkButtonProps {
  isBookmarked: boolean;
  onBookmark: () => Promise<void>;
  onShare: (targetUserId: number, message: string) => Promise<void>;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked, onBookmark, onShare }) => {
  return null; // Replace with actual JSX later