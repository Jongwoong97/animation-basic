import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100%; //200vw, 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  place-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  /* div:first-child,
  div:last-child {
    grid-column: span 1;
  } */
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)<{ transformOriginId?: string }>`
  width: 25vw;
  height: 30vh;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 35px;
`;

const Button = styled(motion.button)`
  width: 90px;
  height: 40px;
  font-size: 22px;
  font-weight: 550;
  color: rgb(0, 0, 255);
  border: none;
  border-radius: 10px;
`;

const varsBox = {
  hover: (hoverId: null | string) => ({
    scale: 1.1,
    x: hoverId === "1" || hoverId === "3" ? -25 : 25,
    y: hoverId === "1" || hoverId === "2" ? -15 : 15,
    transition: { type: "stiffness" },
  }),
};

const varsBtn = {
  focus: ({ clickBtn }: { clickBtn: boolean }) =>
    clickBtn
      ? { scale: 1.2, color: "rgb(243, 156, 18)" }
      : { scale: 1, color: "rgb(0, 0, 255)", transition: { type: "spring" } },
};

function App() {
  const [clikedId, setClickedId] = useState<null | string>(null);
  const [hoverId, setHoveredId] = useState<null | string>(null);
  const [clickBtn, setClickBtn] = useState<boolean>(false);
  const toggleBtn = () => setClickBtn((prev) => !prev);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            custom={hoverId}
            onClick={() => setClickedId(n)}
            onHoverStart={() => setHoveredId(n)}
            key={n}
            layoutId={n}
            variants={varsBox}
            whileHover="hover"
            transformOriginId={n}
          >
            <AnimatePresence>
              {(n === "2" && !clickBtn) || (n === "3" && clickBtn) ? (
                <Circle key={n + "2"} layoutId={"circle"} />
              ) : null}
            </AnimatePresence>
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {clikedId ? (
          <Overlay
            onClick={() => setClickedId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box
              layoutId={clikedId}
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button
        onClick={toggleBtn}
        variants={varsBtn}
        whileFocus="focus"
        custom={{ clickBtn }}
      >
        Switch
      </Button>
    </Wrapper>
  );
}

export default App;
