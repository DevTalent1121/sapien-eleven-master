import { Typography, Divider, Box } from '@mui/material';
import useTheme from '@mui/styles/useTheme';
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

type SectionProps = {
    title?: string;
    align?: 'left' | 'center';
    maxWidth?: number;
    dividerColor?: string;
    dividerHighlightColor?: string;
    fontColor?: string;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
    background?: 'light' | 'dark' | 'transparent';
    sx?: SxProps<Theme>;
    trackHeight?: boolean;
    onHeightChange?: (height: number) => any;
};

export const Section: React.FC<SectionProps> = (props) => {
    const theme = useTheme();
    const contentRef = useRef<HTMLDivElement>();
    const [contentHeight, setContentHeight] = useState(598);

    const updateContentHeight = useCallback(() => {
        setContentHeight(contentRef?.current?.clientHeight || contentHeight);
    }, [contentHeight]);

    useEffect((): any => {
        if (props && props.trackHeight && props.onHeightChange) {
            props.onHeightChange(contentHeight);
        }

        window.addEventListener('resize', updateContentHeight);

        updateContentHeight();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (_: any) => {
            window.removeEventListener('resize', updateContentHeight);
        };
    }, [props.onHeightChange, contentHeight]);

    return (
        <Box
            ref={contentRef}
            sx={props.sx}
            style={Object.assign(
                {
                    backgroundColor:
                        props.background === 'transparent'
                            ? 'transparent'
                            : props.background === 'light'
                            ? theme.palette.background.paper
                            : theme.palette.background.default,
                    width: '100%',
                    padding: `${theme.spacing(6)}px 0`,
                },
                props.style
            )}
        >
            <div
                style={Object.assign(
                    {
                        margin: '0 auto',
                        maxWidth: props.maxWidth,
                        padding: `0 ${theme.spacing(6)}px`,
                        textAlign: props.align,
                    },
                    props.contentStyle
                )}
            >
                {props.title ? (
                    <>
                        <Typography
                            variant={'h5'}
                            align={props.align}
                            style={{
                                fontWeight: 600,
                                marginBottom: theme.spacing(2),
                                color: props.fontColor,
                            }}
                        >
                            {props.title}
                        </Typography>
                        <Divider
                            style={{
                                width: '100%',
                                opacity: props.align === 'center' ? 0 : 1,
                                backgroundColor: props.dividerColor,
                            }}
                        />
                        <Divider
                            style={{
                                width: theme.spacing(8),
                                height: 2,
                                backgroundColor: props.dividerHighlightColor || theme.palette.primary.main,
                                margin: props.align === 'center' ? '-1px auto 0' : '-1px 0 0 0',
                            }}
                        />
                    </>
                ) : (
                    <></>
                )}
                {props.children}
            </div>
        </Box>
    );
};
Section.displayName = 'PageSection';
Section.defaultProps = {
    maxWidth: 1072,
    align: 'left',
    background: 'dark',
};
