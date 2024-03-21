import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";

const options = ["cpp", "javascript", "python", "java", "go"];

const LanguageSelector = ({ language, onSelect }) => {
  const [lang, setlang] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(lang);
  const handleClickListItem = (event) => {
    setlang(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    onSelect(options[index]);
    setSelectedIndex(index);
    setlang(null);
  };

  

  return (
    <Box sx={{ maxWidth: "200px" }}>
      <List component="nav" sx={{ bgcolor: "orange" }}>
        <ListItemButton id="lock-button" onClick={handleClickListItem}>
          <ListItemText
            primary="Select Langueage"
            secondary={language ? language : options[selectedIndex]}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lang-menu"
        anchorEl={lang}
        open={open}
        
        MenuListProps={{
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
export default LanguageSelector;
