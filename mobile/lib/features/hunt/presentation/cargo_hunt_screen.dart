import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../core/theme/app_theme.dart';

class CargoHuntScreen extends StatelessWidget {
  const CargoHuntScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Cargo Hunt Radar'),
        leading: IconButton(
          icon: const Icon(LucideIcons.arrowLeft),
          onPressed: () => context.pop(),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Filter / Active Corridor Header
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppColors.border),
            ),
            child: const Row(
              children: [
                Icon(LucideIcons.compass, color: AppColors.brandAmber, size: 20),
                SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Corridor: Ahmedabad → Surat (NH 48)\nAvailable: 8.0 Ton • Closed Container',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textPrimary),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Matches
          _buildCargoCard(
            context,
            id: 'CG-6001',
            shipper: 'Anand Textiles Limited',
            weight: '6.0 Ton',
            type: 'General Goods',
            price: '₹8,400',
            detour: '+2 km (8 mins)',
            pickup: 'Sanand GIDC, Ahmedabad',
            drop: 'Textile Market, Surat',
            score: 96,
            bandColor: AppColors.success,
            reasons: [
              'Fits within your 8.0T available space',
              'Minimal detour (+2 km on NH 48 corridor)',
              'Verified GST Shipper with Escrow Protection',
            ],
          ),
          const SizedBox(height: 14),

          _buildCargoCard(
            context,
            id: 'CG-5002',
            shipper: 'Gujarat FMCG Distribution Ltd',
            weight: '5.0 Ton',
            type: 'FMCG Goods',
            price: '₹7,200',
            detour: '+4 km (14 mins)',
            pickup: 'Makarpura GIDC, Vadodara',
            drop: 'Ring Road Hub, Surat',
            score: 90,
            bandColor: AppColors.success,
            reasons: [
              'Fits within your 8.0T available space',
              'Pickup directly along NH 48 Vadodara bypass',
              'Fastag automated toll corridor',
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCargoCard(
    BuildContext context, {
    required String id,
    required String shipper,
    required String weight,
    required String type,
    required String price,
    required String detour,
    required String pickup,
    required String drop,
    required int score,
    required Color bandColor,
    required List<String> reasons,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: bandColor.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '$score% SMART MATCH',
                  style: TextStyle(color: bandColor, fontSize: 12, fontWeight: FontWeight.w800),
                ),
              ),
              Text(
                price,
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.textPrimary),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            shipper,
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.textPrimary),
          ),
          const SizedBox(height: 2),
          Text(
            '$weight • $type • Detour $detour',
            style: const TextStyle(fontSize: 13, color: AppColors.textSecondary, fontWeight: FontWeight.w500),
          ),
          const SizedBox(height: 12),
          // Route
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppColors.background,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    const Icon(LucideIcons.circle, size: 10, color: AppColors.brandAmber),
                    const SizedBox(width: 8),
                    Expanded(child: Text(pickup, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                  ],
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    const Icon(LucideIcons.mapPin, size: 12, color: AppColors.primaryNavy),
                    const SizedBox(width: 8),
                    Expanded(child: Text(drop, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          // Transparent algorithm reasons
          ...reasons.map(
            (r) => Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Row(
                children: [
                  const Icon(LucideIcons.check, size: 14, color: AppColors.success),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(r, style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Match accepted for $shipper! Escrow order created.'),
                  backgroundColor: AppColors.primaryNavy,
                ),
              );
              context.push('/trip/TR-9001');
            },
            child: const Text('Accept Freight & Start Trip'),
          ),
        ],
      ),
    );
  }
}
