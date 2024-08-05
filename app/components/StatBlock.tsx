"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn, getOrdinal } from '@/lib/utils';

const StatBlock = ({ children, ...props }) => {
  return (
    <div className={cn("font-fantasy-body text-gray-900", props.className)}>
      {children}
    </div>
  );
};

StatBlock.Heading = ({ title, subtitle, ...props }) => {
  return (
    <div className="pb-2">
      <h1
        className="font-fantasy-title text-xl text-fantasy-accent"
        style={{ fontVariant: ["small-caps"] }}
      >
        {title}
      </h1>
      <h2 className="text-sm italic">{subtitle}</h2>
    </div>
  );
};

StatBlock.PropertyLine = ({ title, children, ...props }) => {
  return (
    <div className="leading-tight pb-2">
      <h4 className="font-semibold text-sm inline">{title}</h4>{" "}
      <p className="text-gray-900 text-sm inline">{children}</p>
    </div>
  );
};

StatBlock.Description = ({ children }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className='text-sm'>
      <div className={cn(!showDescription && "line-clamp-3")}>
        <p>
          {children}
          {showDescription && (
            <span
              className="italic hover:text-gray-600 cursor-pointer float-right pr-2"
              onClick={() => setShowDescription(false)}
            >
              less
            </span>
          )}
        </p>
      </div>
      {!showDescription && (
        <div
          className="italic text-right hover:text-gray-600 cursor-pointer pr-2"
          onClick={() => setShowDescription(true)}
        >
          more
        </div>
      )}
    </div>
  );
};

export default StatBlock;
