import React from "react";
import Button, { ButtonProps } from "shared/Button/Button";

export interface ButtonSecondaryProps extends ButtonProps { }

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-white text-neutral-700 dark:text-neutral-300 connect-wallet-btn ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
