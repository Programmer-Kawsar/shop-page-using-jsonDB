export const generateRandomId = ()=> {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 24;
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

export const createProductSlug = (productName) => {
 
  const trimmedName = productName.trim().toLowerCase();

  const slug = trimmedName.replace(/[^a-zA-Z0-9-]+/g, '-');

  return slug;
}

