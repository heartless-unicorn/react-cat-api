import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles/Upload.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

import upload from "../../../media/upload.png";

export default function Upload() {
  const apiKey =
    "live_KFI6LB7w6qzReMGnCyNwSPHqXw00jkLK5V0dmEd0PwwCuDP4IjBnBs7ZnqVq7Gw6";
  const [source, setSource] = useState(null);
  const [status, setStatus] = useState(true);
  const [fileName, setFileName] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

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
    })
      .then((res) => {
        if (res.ok) {
          setSource(null);
          setMessage(
            <p className={`${styles.result}`}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={styles.success}
              />
              Thanks for the Upload - Cat found!
            </p>
          );
        } else {
          setStatus(false);
          setMessage(
            <p className={`${styles.result} `}>
              <FontAwesomeIcon icon={faCircleXmark} className={styles.fail} />{" "}
              No Cat found - try a different one
            </p>
          );
        }
      })
      .catch(() => console.log("Error has occured"));
  }
  async function handleFileSelect(event) {
    event.preventDefault();
    const file = event.target[0].files[0];

    await uploadImage(file);
  }
  function showPicture(event) {
    const file = event.target.files[0];
    setFileName(event.target.files[0].name);
    setSource(URL.createObjectURL(file));
    setStatus(true);
    setMessage(null);
  }
  return (
    <div className={styles.Upload}>
      <div className={styles.background}></div>
      <div className={styles.formField}>
        <div className={styles.buttonBox}>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className={styles.uploadInfo}>
          <h1>Upload a .jpg or .png Cat Image</h1>
          <p>
            Any uploads must comply with the{" "}
            <a
              href="https://thecatapi.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              upload guidelines
            </a>{" "}
            or face deletion.
          </p>
        </div>
        <div className={styles.formBox}>
          <form onSubmit={handleFileSelect}>
            <input
              type="file"
              onChange={showPicture}
              className={styles.fileInput}
            />
            {source ? (
              <div className={styles.picPlaceholder}>
                <img src={source} alt="Cat" className={styles.userPic} />
              </div>
            ) : (
              <div className={`${styles.picPlaceholder}`}>
                <img
                  src={upload}
                  alt="Placeholder"
                  className={styles.placeholder}
                />
                <p>
                  <b>Drag here</b> your file or <b>Click here</b> to upload
                </p>
              </div>
            )}

            {source ? (
              <div className={styles.submitBox}>
                <p>Image File Name: {fileName}</p>
                {status ? (
                  <input
                    type="submit"
                    value="Upload photo"
                    className={styles.submitButton}
                  />
                ) : null}
              </div>
            ) : (
              <p className={styles.noFile}>No file selected</p>
            )}
          </form>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}
