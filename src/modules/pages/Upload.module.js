export default function Upload() {
  const apiKey =
    "live_KFI6LB7w6qzReMGnCyNwSPHqXw00jkLK5V0dmEd0PwwCuDP4IjBnBs7ZnqVq7Gw6";

  async function uploadImage(image) {
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch("https://api.thecatapi.com/v1/images/upload", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
      },
      body: formData,
    });

    const json = await response;
    console.log(json);
  }

  async function handleFileSelect(event) {
    const file = event.target.files[0];
    await uploadImage(file);
  }
  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
    </div>
  );
}
