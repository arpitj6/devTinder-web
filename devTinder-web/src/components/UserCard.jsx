const UserCard = ({ user }) => {
  console.log(user);
  return (
    user && (
      <div className="flex justify-center">
        <div className="card bg-base-300 w-96 shadow-xl ">
          <figure className="functional">
            <img src={user.photoUrl} alt={user.firstName} />
          </figure>
          <div className="card-body">
            <h2 className="card-title justify-center text-xl font-bold">
              {user.firstName} {user.lastName} 
            </h2>
            <h2 className="card-title justify-center text cl font-bold">
              {" "}
              {user.gender === "male"
                ? "♂️"
                : user.gender === "female"
                  ? "♀️"
                  : "⚧️"}{" "}
              | {user?.age || "N/A"} years
            </h2>
            <div className="flex justify-center font-medium tondo-text">
              {user.about || "This is default about text!"}
            </div>
            <div className="card-actions justify-center my-10">
              <button className="btn btn-soft btn-secondary text-pink-800">
                Interested
              </button>
              <button className="btn btn-soft btn-primary text-blue-800">
                Ignored
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
