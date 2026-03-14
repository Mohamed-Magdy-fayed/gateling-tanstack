import type { TRPCClientErrorLike } from "@trpc/client";
import { AlertCircleIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import type { TRPCRouter } from "@/integrations/trpc/router";

type AppTRPCError = TRPCClientErrorLike<TRPCRouter>;

export function QueryState({
	error,
	isPending,
	isEmpty,
	emptyAction,
	refetch,
	children,
}: PropsWithChildren<{
	error: AppTRPCError | null;
	isPending: boolean;
	isEmpty: boolean;
	emptyAction: React.ReactNode;
	refetch: () => unknown | Promise<unknown>;
}>) {
	if (isPending) {
		return (
			<Badge variant="secondary">
				<Spinner data-icon="inline-start" />
				Loading...
			</Badge>
		);
	}

	if (error) {
		return (
			<Alert className="max-w-md" variant="destructive">
				<AlertCircleIcon />
				<AlertTitle>
					{error?.data?.appCode
						? `Error (${error.data.appCode})`
						: error?.data?.code
							? `Error (${error.data.code})`
							: "Error"}
				</AlertTitle>
				<AlertDescription>
					{error?.message || "An unexpected error occurred."}
				</AlertDescription>
				<AlertAction>
					<Button
						onClick={() => {
							refetch();
						}}
						size="xs"
						variant="default"
					>
						Retry
					</Button>
				</AlertAction>
			</Alert>
		);
	}

	if (isEmpty) {
		<Empty className="w-full">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<AlertCircleIcon />
				</EmptyMedia>
				<EmptyTitle>No data found</EmptyTitle>
				<EmptyDescription>
					Try adding some data to see it here.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>{emptyAction}</EmptyContent>
		</Empty>;
	}

	return <>{children}</>;
}
