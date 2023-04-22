import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, getOverFiveKg } from "./store/reducers/photos";

const Photos = () => {
  const data = useSelector(getOverFiveKg);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (!data) return null;
  return (
    <div>
      {data.map((photo) => (
        <li key={photo.id}>
          {photo.title} | {photo.peso}
        </li>
      ))}
    </div>
  );
};

export default Photos;
