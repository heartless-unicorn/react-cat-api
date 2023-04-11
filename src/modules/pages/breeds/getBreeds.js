export default async function getBreeds() {
  let breeds = [];
  await fetch("https://api.thecatapi.com/v1/breeds/")
    .then((response) => response.json())
    .then((value) => {
      breeds = value.map((el) => {
        return {
          name: el.name,
          breed_id: el.id,
          id: el.reference_image_id,
          url: `https://cdn2.thecatapi.com/images/${el.reference_image_id}.jpg`,
        };
      });
    })
    .catch((err) => console.log(err));

  return breeds;
}
