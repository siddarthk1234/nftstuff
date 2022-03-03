import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/2.png";
import i2 from "./assets/images/blondHair.png";
import i3 from "./assets/images/capWithGoggles.png";
import i4 from "./assets/images/cowboyhat.png";
import i5 from "./assets/images/crownHair.png";
import i6 from "./assets/images/goggles.png";
import i7 from "./assets/images/mohawk.png";
import i8 from "./assets/images/rainbowbeanie.png";
import i9 from "./assets/images/stringyHair.png";
import i10 from "./assets/images/tophat1.png";
import i11 from "./assets/images/ape1.png";
import i12 from "./assets/images/human.png";
import i13 from "./assets/images/martian.png";
import i14 from "./assets/images/zombie.png";
import i15 from "./assets/images/3DGlasses1.png";
import i16 from "./assets/images/buck_teeth.png";
import i17 from "./assets/images/lampCigar.png";
import i18 from "./assets/images/blueBackground.png";


export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 100px;
  border: none;
  background-color: #ff0000;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 15px;
  height: 15x;
  @media (min-width: 767px) {
    width: 100px;
    height: 100px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Siddarth PUNK Clone...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account,_amount)
      .send({
        gasLimit: "285000",
        to: "0x33F7a94c07D8B941Fa811E4DCdFf9d75CBad455C",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((1 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Siddarth PUNK Clone. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "var(--green)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
        >
          Mint a SIDDARTH PUNK CLONEz
        </s.TextTitle>
        <s.SpacerMedium />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"example"} src={i1} />
            <s.SpacerMedium />
            <s.TextTitle
              style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}
            >
              {data.totalSupply}/ 2905
            </s.TextTitle>
          </s.Container>
          <s.SpacerMedium />
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "#383838", padding: 24 }}
          >
            {Number(data.totalSupply) == 2905 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  You can still find Siddarth's PUNK Clones on{" "}
                  <a
                    target={"_blank"}
                    href={"https://opensea.io/collection/siddarth-christmas=nft"}
                  >
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  1 PUNK Clone costs 1 MATIC.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  Excluding gas fee.
                </s.TextDescription>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerMedium />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      Connect to the Polygon network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 1"}
                    </StyledButton>
                  </s.Container>
                )}
              </>
            )}
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.Container>
          <s.TextTitle>hairorhead:</s.TextTitle>
          <s.Container flex={2} ai={"left"} fd={"row"}>
          <StyledImg alt={"example"} src={i2} />
          <StyledImg alt={"example"} src={i3} />
          <StyledImg alt={"example"} src={i4} />
          <StyledImg alt={"example"} src={i5} />
          <StyledImg alt={"example"} src={i6} />
          <StyledImg alt={"example"} src={i7} />
          <StyledImg alt={"example"} src={i8} />
          <StyledImg alt={"example"} src={i9} />
          <StyledImg alt={"example"} src={i10} />
          </s.Container>
          <s.TextTitle>raceOfPunk:</s.TextTitle>
          <s.Container flex={2} ai={"left"} fd={"row"}>
          <StyledImg alt={"example"} src={i11} />
          <StyledImg alt={"example"} src={i12} />
          <StyledImg alt={"example"} src={i13} />
          <StyledImg alt={"example"} src={i14} />
          </s.Container>

          <s.TextTitle>MouthOrEyeAccessorie:</s.TextTitle>
          <s.Container flex={2} ai={"left"} fd={"row"}>
          <StyledImg alt={"example"} src={i15} />
          <StyledImg alt={"example"} src={i16} />
          <StyledImg alt={"example"} src={i17} />
          </s.Container>
          <s.TextTitle>Background:</s.TextTitle>
         
          <StyledImg alt={"example"} src={i18} />
         
         
         

          <s.TextTitle>
           STORY: As a little kid I always use to act like a punk and still do. I used to pull pranks on my family and my sister. I  always had this fascination
           of pulling pranks. It was fun for me. Other than the prank aspect of being a punk I used to always act rebellious and etc. Hope you enjoyed my story guys!
          </s.TextTitle>
          <s.SpacerSmall />
          <s.TextTitle>
           ROADMAP: Over the course of the next few months I will add more traits and features to my punks. This is what will make my punks more Special.
          </s.TextTitle>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
