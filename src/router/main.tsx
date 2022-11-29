import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { GymtimePage } from '../pages/Private/GymtimePage';
import { LoungePage } from '../pages/Private/LoungePage';
import {MarketplacePage} from '../pages/Private/MarketplacePage';
import { ShopPage } from '../pages/Private/ShopPage';
import { ThekitchenPage } from '../pages/Private/ThekitchenPage';
import { UpdatePage } from '../pages/Private/UpdatePage';
import { WLMintPage } from '../pages/Private/WLmint';
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
        <Route key={`route_thekitchen`} path={`kithen11`} element={<ThekitchenPage />} />;
        <Route key={`route_gymtime`} path={`sapiengym`} element={<GymtimePage />} />;
        <Route key={`route_lounge`} path={`thelounge`} element={<LoungePage />} />;
        <Route key={`route_wlmint`} path={`wlmint`} element={<WLMintPage />} />;
        <Route key={`route_shop`} path={`shop`} element={<ShopPage />} />;
        <Route key={`route_marketplace`} path={`marketplace`} element={<MarketplacePage />} />;
        <Route key={`route_updates`} path={`updates`} element={<UpdatePage />} />;
        <Route path={'*'} element={<Navigate to={'/'} />} />
    </>
);
