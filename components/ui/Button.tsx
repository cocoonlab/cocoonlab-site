import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import type { Route } from "next";
import type { UrlObject } from "url";

type ButtonVariant = "primary" | "secondary" | "accent";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: Route | UrlObject;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent"
};

export function Button({
  children,
  className,
  variant = "primary",
  href,
  ...rest
}: ButtonProps) {
  const classes = [VARIANT_STYLES[variant], className].filter(Boolean).join(" ");

  if (href) {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
