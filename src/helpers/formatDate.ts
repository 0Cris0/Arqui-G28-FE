export const formatDate = (dateString: string | number | Date): string => {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return 'Fecha inválida';

  return date.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
