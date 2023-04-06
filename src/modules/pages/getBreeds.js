export default async function getBreeds() {
  let breeds = [];
  await fetch("https://api.thecatapi.com/v1/breeds/")
    .then((response) => response.json())
    .then((value) => {
      breeds = value.map((el) => {
        return {
          name: el.name,
          id: el.id,
          img: el.reference_image_id,
        };
      });
    })
    .catch((err) => console.log(err));

  return breeds;
}
