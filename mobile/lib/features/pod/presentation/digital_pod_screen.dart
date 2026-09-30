import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../core/theme/app_theme.dart';

class DigitalPodScreen extends StatefulWidget {
  final String tripId;
  const DigitalPodScreen({super.key, required this.tripId});

  @override
  State<DigitalPodScreen> createState() => _DigitalPodScreenState();
}

class _DigitalPodScreenState extends State<DigitalPodScreen> {
  final TextEditingController _consigneeController = TextEditingController(text: 'Ramesh Patel');
  final TextEditingController _phoneController = TextEditingController(text: '98250 99887');
  bool _isSubmitting = false;

  void _submitPod() {
    setState(() => _isSubmitting = true);
    Future.delayed(const Duration(seconds: 1), () {
      setState(() => _isSubmitting = false);
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: const Text('Digital POD Verified ✓'),
          content: const Text('Proof of Delivery submitted successfully. ₹8,400 has been released from escrow into your withdrawable wallet balance.'),
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.of(ctx).pop();
                context.go('/wallet');
              },
              child: const Text('View Wallet Balance'),
            ),
          ],
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Digital POD Signoff'),
        leading: IconButton(
          icon: const Icon(LucideIcons.arrowLeft),
          onPressed: () => context.pop(),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Consignee Details Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'CONSIGNEE VERIFICATION',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textSecondary),
                ),
                const SizedBox(height: 14),
                const Text('Receiver Name', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                const SizedBox(height: 6),
                TextField(
                  controller: _consigneeController,
                  decoration: const InputDecoration(hintText: 'Enter receiving manager name'),
                ),
                const SizedBox(height: 14),
                const Text('Receiver Mobile', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                const SizedBox(height: 6),
                TextField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(hintText: '10-digit mobile number'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // GPS Location Stamp Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.border),
            ),
            child: const Row(
              children: [
                Icon(LucideIcons.mapPin, color: AppColors.brandAmber, size: 22),
                SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('GPS Geofence Verified', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
                      Text('21.1702° N, 72.8311° E • Surat Textile Market Hub', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                    ],
                  ),
                ),
                Icon(LucideIcons.checkCircle, color: AppColors.success, size: 20),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Digital Signature Box
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'RECEIVER SIGNATURE',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textSecondary),
                ),
                const SizedBox(height: 12),
                Container(
                  height: 120,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: AppColors.background,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.border, style: BorderStyle.solid),
                  ),
                  child: const Center(
                    child: Text(
                      'Sign on touch screen here',
                      style: TextStyle(color: AppColors.textMuted, fontSize: 13, fontStyle: FontStyle.italic),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.brandAmber,
              foregroundColor: Colors.white,
            ),
            onPressed: _isSubmitting ? null : _submitPod,
            child: _isSubmitting
                ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                : const Text('Complete Delivery & Release Escrow Payment'),
          ),
        ],
      ),
    );
  }
}
