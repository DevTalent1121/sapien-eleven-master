import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
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
        <Route path={'*'} element={<Navigate to={'/'} />} />
    </>
);
