import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { GymtimePage } from '../pages/Private/GymtimePage';
import { ThekitchenPage } from '../pages/Private/ThekitchenPage';
import { PAGES } from './routes';

export const MainRouter = (
    <>
        {PAGES.map((page) => {
            const RouteElement = page.component;
            if(page.items)
            {
                
                return (<Route key={`route_${page.route}`} path={`${page.route}`} element={<Outlet />} >
                    <Route key={`route_${page.route}`} path={''} element={<RouteElement />} ></Route>

                {page.items.map((item) => {
                    const SubRouteElement = item.component;
                    return <Route key={`route_${item.route}`} path={`${item.route}`} element={<SubRouteElement />} />;
                })}
                </Route>);

            }
            else
            {
                return <Route key={`route_${page.route}`} path={`${page.route}`} element={<RouteElement />} />;
            }
        })}
        <Route key={`route_thekitchen`} path={`thekitchen`} element={<ThekitchenPage />} />;
        <Route key={`route_gymtime`} path={`gymtime`} element={<GymtimePage />} />;
        <Route path={'*'} element={<Navigate to={'/'} />} />
    </>
);
