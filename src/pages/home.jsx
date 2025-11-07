import banner from "../assets/banner.webp";

const Home = () => {
  return (
    <>
      <img
        src={banner}
        alt="React Banner"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          display: "block",
        }}
      />
    </>
  );
};
export default Home;
