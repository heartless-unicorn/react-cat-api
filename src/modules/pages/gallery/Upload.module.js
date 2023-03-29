import { useEffect, useState } from "react";

export default function Upload() {
  const apiKey =
    "live_KFI6LB7w6qzReMGnCyNwSPHqXw00jkLK5V0dmEd0PwwCuDP4IjBnBs7ZnqVq7Gw6";
  const [source, setSource] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {}, [message]);

  async function uploadImage(image) {
    const formData = new FormData();
    formData.append("file", image);

    await fetch("https://api.thecatapi.com/v1/images/upload", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        setStatus(true);
        setSource(null);
        setMessage("Success");
      } else {
        console.log("here");
        setStatus(false);
        setMessage("No cat");
      }
    });
  }
  async function handleFileSelect(event) {
    event.preventDefault();
    const file = event.target[0].files[0];
    await uploadImage(file);
  }
  function showPicture(event) {
    setStatus(null);
    const file = event.target.files[0];
    setSource(URL.createObjectURL(file));
  }
  return (
    <div>
      <form onSubmit={handleFileSelect}>
        <input type="file" onChange={showPicture} />
        {source && <img src={source} alt="Cat" style={{ width: 250 }} />}

        {source ? (
          <input type="submit" value="Upload photo" />
        ) : (
          "No file selected"
        )}
      </form>
      {message}
    </div>
  );
}
