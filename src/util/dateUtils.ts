export const calculateTimeLeft = () => {
    const targetDate = new Date('2024-03-15');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
  
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };