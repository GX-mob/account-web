import { observer } from "mobx-react";
import NumberFormat from "react-number-format";
import {
  Switch,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core";

import { AccountState } from "../../../stores/dashboard";
import { stylesHook } from "../../../style/dashboard";

export default observer(function AuthSecondFactor() {
  const { formControl } = stylesHook();

  const activated = !!AccountState.data.authSecondFactor;

  const handleChange = function(e, value) {
    AccountState.setUpdate(
      "auth",
      {
        authSecondFactor: value
      },
      true
    );
  };

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            id="switch-auth-two-factors"
            primary="Autenticação em 2 fatores"
            style={{ marginLeft: "-18px" }}
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={activated}
              onChange={() => {
                AccountState.setUpdate(
                  "auth",
                  {
                    authSecondFactor: !activated
                      ? AccountState.data.phones[0]
                      : false
                  },
                  true
                );
              }}
              inputProps={{ "aria-labelledby": "switch-auth-two-factors" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      {activated && (
        <FormControl component="fieldset" className={formControl}>
          <FormLabel component="legend">Destinatário</FormLabel>
          <RadioGroup
            aria-label="Destinatário"
            value={AccountState.data.authSecondFactor}
            onChange={handleChange}
          >
            {AccountState.data.phones.map((number, idx) => (
              <FormControlLabel
                key={idx}
                value={number}
                control={<Radio />}
                label={
                  <NumberFormat
                    format="(##) #####-####"
                    displayType="text"
                    value={number}
                  />
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    </>
  );
});
