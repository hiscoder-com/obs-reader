import { Block } from "konsta/react";
import FromDevice from "../components/FromDevice";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { titleState } from "../atoms";

export default function FromDevicePage() {
  const setTitle = useSetRecoilState(titleState);
  useEffect(() => {
    setTitle('OpenBibleStories');
  }, [setTitle]);

  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <FromDevice />
    </Block>
  );
}
