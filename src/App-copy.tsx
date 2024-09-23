import { CheckCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { cva } from "class-variance-authority";
import { RequiredVariantProps } from "./types"; // I don't get this one

/*remove prop| "_content" won't be available in the type of ButtonProps. 
We don't want to pass "_contant" as a prop, it will be directly in buttonVariants*/
type ButtonVariants = Omit<
  RequiredVariantProps<typeof buttonVariants>, // imported from types
  "_content"
>;

type SVGComponent = React.ComponentType<React.SVGAttributes<SVGSVGElement>>;

/* BTN type */
type ButtonProps = Partial<ButtonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  (
    | { leadingIcon?: SVGComponent; trailingIcon?: never }
    | { leadingIcon?: never; trailingIcon?: SVGComponent }
  ); /* Only one Icon at the time */

/* ICON_BTN type */
type IconButtonProps = Omit<
  ButtonProps,
  "rounded" | "leadingIcon" | "trailingIcon" | "children"
> & {
  hiddenLabel: string;
  icon: SVGComponent;
};

const intents = [
  "primary",
  "secondary",
  "soft",
] satisfies ButtonVariants["intent"][];

const sizes = ["xs", "sm", "md", "lg", "xl"] satisfies ButtonVariants["size"][];

const iconPositions = ["leadingIcon", "trailingIcon"] as const;

/* CVA Variants */
const buttonVariants = cva("font-semibold shadow-sm", {
  /* variants */
  variants: {
    intent: {
      primary:
        "bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700",
      secondary:
        "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 active:bg-gray-100",
      soft: "bg-indigo-50 text-teal-700 hover:bg-teal-100 active:bg-teal-200",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-sm",
    },
    rounded: {
      normal: "",
      full: "rounded-full",
    },
    _content: {
      text: "",
      textAndIcon: "inline-flex items-center",
      icon: "",
    },
  },
  /* compoundVariants| When we meet the conditions the corresponding className is applied */
  compoundVariants: [
    { size: ["xs", "sm"], rounded: "normal", className: "rounded" },
    { size: ["md", "lg", "xl"], rounded: "normal", className: "rounded-md" },
    {
      size: ["xs", "sm"],
      _content: ["text", "textAndIcon"],
      className: "gap-x-1.5 px-2 py-1",
    },
    {
      size: ["md", "lg", "xl"],
      _content: ["text", "textAndIcon"],
      className: "gap-x-2",
    },
    {
      size: "md",
      _content: ["text", "textAndIcon"],
      className: "px-2.5 py-1.5",
    },
    {
      size: "lg",
      _content: ["text", "textAndIcon"],
      className: "px-3 py-2",
    },
    {
      size: "xl",
      _content: ["text", "textAndIcon"],
      className: "px-3.5 py-2.5",
    },
    { size: "xs", _content: "icon", className: "p-0.5" },
    { size: "sm", _content: "icon", className: "p-1" },
    { size: "md", _content: "icon", className: "p-1.5" },
    { size: "lg", _content: "icon", className: "p-2" },
    { size: "xl", _content: "icon", className: "p-2.5" },
  ],
  /* defaultsVariants| If nothing specified then the default is applied */
  defaultVariants: {
    intent: "primary",
    size: "md",
    rounded: "normal",
    _content: "text",
  },
});

/* BTN WRAPPER */
function ButtonWrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-x-8">{children}</div>;
}

/* ICON BTN */
function IconButton({
  icon: Icon,
  intent,
  size,
  hiddenLabel,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={buttonVariants({
        className,
        intent,
        rounded: "full",
        size,
        _content: "icon",
      })}
      {...props}
    >
      <p className="sr-only">{hiddenLabel}</p>
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

/* BTN */
function Button({
  intent,
  size,
  rounded,
  className,
  children,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({
        className,
        intent,
        rounded,
        size,
        _content: LeadingIcon || TrailingIcon ? "textAndIcon" : "text",
      })}
      {...props}
    >
      {LeadingIcon ? (
        <LeadingIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      ) : null}

      {children}

      {TrailingIcon ? (
        <TrailingIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      ) : null}
    </button>
  );
}

/* SECTION WRAPPER */
function SectionWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="space-y-4 border border-teal-700 rounded-md py-4 px-8 w-full flex flex-col items-center bg-teal-200">
      <h2 className=" border-b border-teal-700 font-bold text-2xl pb-1 w-full text-center">
        {title}
      </h2>
      {children}
    </section>
  );
}

//COMPONENT
export default function Buttons() {
  return (
    <div className="bg-teal-100 min-w-[900px]">
      <div className="w-[900px] mx-auto">
        <div className=" min-h-screen flex flex-col items-center gap-4 py-20 mx-10 ">
          <h1 className=" border border-teal-700 bg-teal-300 rounded-md w-full py-2 text-center font-bold text-3xl //uppercase //bg-teal-700 //text-white">
            Design System for Buttons using CVA
          </h1>
          <div className=" w-full space-y-8 rounded-lg flex flex-col items-center">
            {/* Intent + Size buttons */}
            <SectionWrapper title=" Intent + Size buttons">
              {intents.map((intent) => (
                <ButtonWrapper key={intent}>
                  {sizes.map((size) => (
                    <Button key={size} intent={intent} size={size}>
                      Button text
                    </Button>
                  ))}
                </ButtonWrapper>
              ))}
            </SectionWrapper>

            {/* Icon buttons */}
            <SectionWrapper title="  Icon buttons">
              {iconPositions.map((iconPosition) => (
                <ButtonWrapper key={iconPosition}>
                  {sizes.map((size) => {
                    const iconProps =
                      iconPosition === "leadingIcon"
                        ? { leadingIcon: CheckCircleIcon }
                        : { trailingIcon: CheckCircleIcon };
                    return (
                      <Button
                        key={size}
                        intent="primary"
                        size={size}
                        {...iconProps}
                      >
                        Button text
                      </Button>
                    );
                  })}
                </ButtonWrapper>
              ))}
            </SectionWrapper>

            {/* Rounded buttons */}
            <SectionWrapper title=" Rounded buttons">
              {intents.map((intent) => (
                <ButtonWrapper key={intent}>
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      intent={intent}
                      size={size}
                      rounded="full"
                    >
                      Button text
                    </Button>
                  ))}
                </ButtonWrapper>
              ))}
            </SectionWrapper>

            {/* Icon buttons */}
            <SectionWrapper title="Icon buttons">
              {intents.map((intent) => (
                <ButtonWrapper key={intent}>
                  {sizes.map((size) => (
                    <IconButton
                      key={size}
                      intent={intent}
                      size={size}
                      hiddenLabel="Plus it!"
                      icon={PlusIcon}
                    />
                  ))}
                </ButtonWrapper>
              ))}
            </SectionWrapper>

            {/* <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" /> */}

            {/* RENDERIZADO DEL MODO LARGO */}
            <PrimaryButtons />
            <SecondaryButtons />
            <SoftButtons />
            <ButtonsWithLeadingIcon />
            <ButtonsWithTrailingIcon />
            <RoundedPrimaryButtons />
            <RoundedSecondaryButtons />
            <CircularButtons />
          </div>
        </div>
      </div>
    </div>
  );
}

/************************* START| COMPONENTS -- MODO LARGO *************************/
function PrimaryButtons() {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
    </ButtonWrapper>
  );
}

function SecondaryButtons() {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
    </ButtonWrapper>
  );
}

function SoftButtons() {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Button text
      </button>
    </ButtonWrapper>
  );
}

function ButtonsWithLeadingIcon() {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Button text
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Button text
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Button text
      </button>
    </ButtonWrapper>
  );
}

function ButtonsWithTrailingIcon() {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
        <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
        <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
        <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>
    </ButtonWrapper>
  );
}

function RoundedPrimaryButtons() {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-full bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>
    </ButtonWrapper>
  );
}

function RoundedSecondaryButtons() {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
      <button
        type="button"
        className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Button text
      </button>
    </ButtonWrapper>
  );
}

function CircularButtons() {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </ButtonWrapper>
  );
}
/************************* END| COMPONENTS -- MODO LARGO *************************/
