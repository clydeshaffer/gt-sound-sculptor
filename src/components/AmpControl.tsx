import { ReactElement } from "react";
import { Slider } from "./Slider";

import "../scss/amp-control.css";

interface Props {
  onChange: (values: Array<number>) => void;
  values: Array<number>;
  ampWarning?: string;
}

const minValue = 0;
const maxValue = 8;

export const AmpControl = ({
  onChange,
  values,
  ampWarning,
}: Props): ReactElement => {
  const handleValueUpdate = (ix: number) => (v: number) => {
    const ret = [...values];
    if (!isNaN(v)) {
      ret[ix] = Math.max(Math.min(v, maxValue), minValue);
    }
    onChange(ret);
  };

  return (
    <div className="control amp-control">
      <div className="label">Amp</div>
      <div>
        <div className="control-units">
          {values.map((v, ix) => (
            <div className="control-unit" key={ix}>
              <Slider
                key={ix}
                value={v}
                setValue={handleValueUpdate(ix)}
                possibleValues={8}
                pxPerValue={16}
              />
              <input
                type="number"
                value={v}
                onChange={(ev) =>
                  handleValueUpdate(ix)(Number(ev.target.value))
                }
              />
            </div>
          ))}
        </div>
        {ampWarning && values.some((v) => v > 6) && <div>{ampWarning}</div>}
      </div>
    </div>
  );
};
