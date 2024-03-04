export default function (argv: {
    [arg: string]: any;
}): Promise<{
    portAlreadyUsed?: boolean;
    ready: Promise<void>;
}>;
