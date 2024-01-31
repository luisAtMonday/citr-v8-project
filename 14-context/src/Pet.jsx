import { Link } from "react-router-dom";

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link
      to={`/details/${id}`}
      className="my-6 mx-0 block h-32 w-full overflow-hidden border-b-2 border-solid border-gray-800"
    >
      <div className="image-container float-left mt-0 mb-5 ml-0 mr-2.5 h-24 w-24">
        <img src={hero} alt={name} />
      </div>
      <div className="float-left h-24 w-5/6 flex-col justify-around pt-2.5">
        <h1 className="m-0 w-11/12 truncate text-3xl font-normal text-red-100">
          {name}
        </h1>
        <h2 className="m-0 truncate text-lg font-normal">{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
