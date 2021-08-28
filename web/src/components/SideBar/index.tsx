import React, { useCallback } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useSignMenu } from '../../hooks/toggle';
import {
  FaHome,
  FaUsers,
  FaTh,
  FaCarAlt,
  FaCalendarCheck
} from "react-icons/fa";

import {
  SideMenuContainer,
  ButtonsContainer,
  Buttons,
  IconLink,
} from './styles';
import { useAuth } from '../../hooks/auth';

const SideMenu: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { activatedMenu, handleChangeActivatedMenu } = useSignMenu();

  const handleRedirectToDashboard = useCallback(() => {
    handleChangeActivatedMenu('dashboard');
    history.push('/dashboard');
  }, [history, handleChangeActivatedMenu]);

  const handleRedirectToUsers = useCallback(() => {
    handleChangeActivatedMenu('users');
    history.push('/users');
  }, [history, handleChangeActivatedMenu]);

  const handleRedirectToCategories = useCallback(() => {
    handleChangeActivatedMenu('categories');
    history.push('/categories');
  }, [history, handleChangeActivatedMenu]);

  const handleRedirectToCars = useCallback(() => {
    handleChangeActivatedMenu('cars');
    history.push('/cars');
  }, [history, handleChangeActivatedMenu]);

  const handleRedirectToRentals = useCallback(() => {
    handleChangeActivatedMenu('rentals');
    history.push('/rentals');
  }, [history, handleChangeActivatedMenu]);

  return (
    <>
      <SideMenuContainer>
        <ButtonsContainer>
          <Buttons activatedMenu={activatedMenu}>
            <Link to="/dashboard">
              <button
                className="dashboard"
                type="button"
                onClick={handleRedirectToDashboard}
              >
                Página inicial
                <IconLink>
                  <FaHome color="#fff" />
                </IconLink>
              </button>
            </Link>

            {user.isAdmin ? (
              <div>
                <Link to="/users">
                  <button
                    className="users"
                    type="button"
                    onClick={handleRedirectToUsers}
                  >
                    Usuários
                    <IconLink>
                      <FaUsers color="#fff" />
                    </IconLink>
                  </button>
                </Link>
              </div>
            ) : (
              ''
            )}

            {user.isAdmin ? (
              <div>
                <Link to="/categories">
                  <button
                    className="categories"
                    type="button"
                    onClick={handleRedirectToCategories}
                  >
                    Categorias
                    <IconLink>
                      <FaTh color="#fff" />
                    </IconLink>
                  </button>
                </Link>
              </div>
            ) : (
              ''
            )}

            <div>
              <Link to="/cars">
                <button
                  className="cars"
                  type="button"
                  onClick={handleRedirectToCars}
                >
                  Carros
                  <IconLink>
                    <FaCarAlt color="#fff" />
                  </IconLink>
                </button>
              </Link>
            </div>

            <div>
              <Link to="/rentals">
                <button
                  className="rentals"
                  type="button"
                  onClick={handleRedirectToRentals}
                >
                  Aluguéis
                  <IconLink>
                    <FaCalendarCheck color="#fff" />
                  </IconLink>
                </button>
              </Link>
            </div>
          </Buttons>
        </ButtonsContainer>
      </SideMenuContainer>
    </>
  );
};

export default SideMenu;
