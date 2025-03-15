import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import plus from "@/assets/icons/plus.svg";
import like from "@/assets/icons/like.svg";
import external from "@/assets/icons/external-link.svg";

export interface RoundedButtonProps {
  type: "더보기" | "에픽그램" | "좋아요버튼" | "왕도로가는길" | "커스텀";
  size: "small" | "medium";
  backgroundColor?: string;
  textColor?: string;
  text?: string;
  borderColor?: string;
  likeCount?: number;
  onClick: () => void;
}

interface PresetStyle {
  backgroundColor: string;
  text: string;
  borderColor?: string;
}

const presetStyles: Record<Exclude<RoundedButtonProps["type"], "커스텀">, PresetStyle> = {
  더보기: { backgroundColor: "transparent", text: "더보기", borderColor: "rgba(207, 219, 234, 1)" },
  에픽그램: { backgroundColor: "transparent", text: "에픽그램 만들기", borderColor: "rgba(207, 219, 234, 1)" },
  좋아요버튼: { backgroundColor: "black", text: "좋아요" },
  왕도로가는길: { backgroundColor: "rgba(242, 242, 242, 1)", text: "왕도로 가는 길", borderColor: "rgba(242, 242, 242, 1)" },
};

const buttonSizes: Record<RoundedButtonProps["type"], Record<RoundedButtonProps["size"], { width?: string; height?: string; minWidth?: string }>> = {
    더보기: {
      small: { width: "101px", height: "48px" },
      medium: { width: "120px", height: "56px" },
    },
    에픽그램: {
      small: { width: "125px", height: "48px" },
      medium: { width: "167px", height: "56px" },
    },
    좋아요버튼: {
      small: { minWidth: "76px", height: "36px" },
      medium: { minWidth: "102px", height: "48px" },
    },
    왕도로가는길: {
      small: { minWidth: "140px", height: "48px" },
      medium: { minWidth: "180px", height: "56px" },
    },
    커스텀: {
      small: { width: "auto", height: "auto" }, 
      medium: { width: "auto", height: "auto" },
    },
  };
  

const getTextStyle = (type: RoundedButtonProps["type"], size: RoundedButtonProps["size"], textColor?: string) => {
  return cn(
    "font-pretendard",
    textColor ? `text-[${textColor}]` : "",
    {
      "text-sm font-normal text-blue-400": ["더보기", "에픽그램"].includes(type) && size === "small",
      "text-xl font-normal text-blue-400": ["더보기", "에픽그램"].includes(type) && size === "medium",
      "text-sm font-normal text-gray-300": type === "왕도로가는길" && size === "small",
      "text-xl font-medium text-gray-300": type === "왕도로가는길" && size === "medium",
      "text-sm font-normal leading-6 tracking-normal": size === "small",
      "text-xl font-normal leading-8 tracking-normal": size === "medium",
    }
  );
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
  type,
  size,
  backgroundColor,
  textColor,
  text,
  borderColor,
  likeCount = 0,
  onClick,
}) => {
  const isCustom = type === "커스텀";
  const buttonStyle = isCustom
    ? { backgroundColor: backgroundColor || "transparent", text: text || "", borderColor: borderColor || "transparent" }
    : presetStyles[type];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full border transition hover:opacity-100 hover:scale-105 whitespace-nowrap",
        {
          "bg-opacity-60 bg-black": type === "좋아요버튼",
          "bg-black": buttonStyle.backgroundColor === "black",
          "bg-white": buttonStyle.backgroundColor === "white",
          "bg-transparent": buttonStyle.backgroundColor === "transparent",
          "px-3 py-1": size === "small",
          "px-4 py-2": size === "medium",
          "gap-1": ["더보기", "에픽그램", "좋아요버튼"].includes(type), 
          "gap-[5px]": type === "왕도로가는길" && size === "small", 
          "gap-[6px]": type === "왕도로가는길" && size === "medium", 
        }
      )}
      style={{
        borderColor: buttonStyle.borderColor || "transparent",
        borderWidth: ["더보기", "에픽그램"].includes(type) ? "1px" : undefined,
        backgroundColor: isCustom ? backgroundColor : buttonStyle.backgroundColor,
        ...(buttonSizes[type]?.[size] || {}),
      }}
    >
      {type === "더보기" && <Image src={plus} alt="더보기 아이콘" width={24} height={24} />}

      {type === "좋아요버튼" ? (
        <>
          <Image src={like} alt="좋아요 아이콘" width={size === "small" ? 20 : 36} height={size === "small" ? 20 : 36} />
          <p className="font-pretendard font-semibold text-white">{likeCount}</p>
        </>
      ) : type === "왕도로가는길" ? (
        <>
          <p className={getTextStyle(type, size)}>{buttonStyle.text || text}</p>
          <Image src={external} alt="외부 링크 아이콘" width={size === "small" ? 20 : 36} height={size === "small" ? 20 : 36} />
        </>
      ) : (
        <p className={getTextStyle(type, size, textColor)}>{buttonStyle.text || text}</p>
      )}
    </button>
  );
};

export default RoundedButton;
