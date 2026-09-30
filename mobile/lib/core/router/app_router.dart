import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/login_screen.dart';
import '../../features/home/presentation/home_screen.dart';
import '../../features/hunt/presentation/cargo_hunt_screen.dart';
import '../../features/trips/presentation/live_tracking_screen.dart';
import '../../features/wallet/presentation/wallet_screen.dart';
import '../../features/pod/presentation/digital_pod_screen.dart';

final GoRouter appRouter = GoRouter(
  initialLocation: '/home',
  routes: [
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/hunt',
      builder: (context, state) => const CargoHuntScreen(),
    ),
    GoRoute(
      path: '/trip/:id',
      builder: (context, state) {
        final tripId = state.pathParameters['id'] ?? 'TR-9001';
        return LiveTrackingScreen(tripId: tripId);
      },
    ),
    GoRoute(
      path: '/wallet',
      builder: (context, state) => const WalletScreen(),
    ),
    GoRoute(
      path: '/pod/:tripId',
      builder: (context, state) {
        final tripId = state.pathParameters['tripId'] ?? 'TR-9001';
        return DigitalPodScreen(tripId: tripId);
      },
    ),
  ],
);
