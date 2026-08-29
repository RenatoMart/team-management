'use client';

import { createContext, useContext } from 'react';

export const DrawerContext = createContext<{
	open: boolean;
	close: () => void;
}>({
	open: false,
	close: () => {},
});

export function useDrawer() {
	return useContext(DrawerContext);
}
