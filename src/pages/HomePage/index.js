import NavBar from "../../components/navbar";
import NavLine from "../../components/navLine";
import Body from "../../components/PrincipalPageComp/Body"


const HomePage = (props) => {
  console.log(props.username);
    return (
        <>
        <div className="scroll">
          <NavLine name="Dashboard"/>
          <NavBar/>
          <Body />
        </div>
        </>
    );
};

export default HomePage;
