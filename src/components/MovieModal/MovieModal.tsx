import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';
import { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  if (movie === null) {
    return;
  }

  const backdropClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === `Escape`) return onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={backdropClose}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          <IoCloseOutline />
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie?.title}</h2>
          <p>{movie?.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie?.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie?.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
