import { useTranslation } from "react-i18next";
import React, { useEffect, useState, useRef } from "react";
import './LanguageSwitcher.scss'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const selectedLanguage = localStorage.getItem("lang") || "EN";
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && anchorEl) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <div className="language-switcher">
      <div className="switcher">
        <button
          onClick={handleClick}
          className="language-button"
        >
          <span className="selected-language">{selectedLanguage}</span>
        </button>

        {anchorEl && (
          <div ref={menuRef} className="dropdown-menu">
            <div className="language-container">
              <button onClick={() => changeLanguage("EN")} className="language">
                English
              </button>
              <button onClick={() => changeLanguage("RU")} className="language">
                Русский
              </button>
              <button onClick={() => changeLanguage("AZ")} className="language">
                Azərbaycan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}