export const formatDate = (date) => {
    return date.toLocaleDateString(
      'en-gb',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    );
  }